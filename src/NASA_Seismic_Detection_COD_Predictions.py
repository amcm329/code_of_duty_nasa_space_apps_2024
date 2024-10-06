import glob
import os
import pandas as pd
from obspy import read, UTCDateTime, Stream, Trace
from obspy.signal.invsim import cosine_taper
from obspy.signal.filter import highpass
from obspy.signal.trigger import classic_sta_lta, trigger_onset
import numpy as np
from hyperopt import fmin, tpe, hp, STATUS_OK, Trials
import matplotlib.pyplot as plt
from datetime import timedelta, datetime

csv_file = "../space_apps_2024_seismic_detection/data/predictions.csv"  
df = pd.read_csv(csv_file)
file_list = df['filename'].tolist()

# List of directories to find the desired filenames
directories = ["../space_apps_2024_seismic_detection/data/mars/test/data/", 
               "../space_apps_2024_seismic_detection/data/lunar/test/data/S12_GradeB",
               "../space_apps_2024_seismic_detection/data/lunar/test/data/S15_GradeA",
               "../space_apps_2024_seismic_detection/data/lunar/test/data/S15_GradeB",
               "../space_apps_2024_seismic_detection/data/lunar/test/data/S16_GradeA",
               "../space_apps_2024_seismic_detection/data/lunar/test/data/S16_GradeB"] 

def find_mseed_file(filename, directories):
    """
    Search .mseed file in list of directories.
    """
    for directory in directories:
        # Generate full path inside the directory
        filepath = os.path.join(directory, filename)
        if os.path.exists(filepath):
            return filepath 
    return None 

def process_files_from_csv(file_list, directories):
    """
    Process files if they are in the directories.
    """
    for filename in file_list:
        # Search file
        mseed_file_path = find_mseed_file(filename, directories)
        
        if mseed_file_path:
            print(f"Processing file: {mseed_file_path}")
            process_file_preds(mseed_file_path)
        else:
            print(f"File not found: {filename}")


def process_file_preds(mseed_file):
    """ 
    Processes a .mseed file using HighPass filter + Bayesian Optimization + STA/LTA 
    """
    # Read the .mseed file
    st = read(mseed_file)
    tr = st.traces[0].copy()
    tr_times = tr.times()
    tr_data = tr.data

    # Initial parameters (sampling rate and start time)
    starttime = tr.stats.starttime.datetime
    df = tr.stats.sampling_rate

    # Apply high-pass filter
    corner_freq = 0.02
    filter_order = 4
    filtered_data = highpass(tr.data, corner_freq, df, corners=filter_order, zerophase=True)

    # STA/LTA
    sta_len = 120
    lta_len = 600
    cft = classic_sta_lta(filtered_data, int(sta_len * df), int(lta_len * df))

    # Bayesian optimization (the full definition is omitted here for clarity)
    def evaluate_thresholds(params):
        thr_on = params['thr_on']
        thr_off = params['thr_off']
        on_off = np.array(trigger_onset(cft, thr_on, thr_off))
        if len(on_off) == 0:
            return {'loss': -1e9, 'status': STATUS_OK}
        durations = tr_times[on_off[:, 1]] - tr_times[on_off[:, 0]]
        total_duration = np.sum(durations)
        return {'loss': -total_duration, 'status': STATUS_OK}

    space = {
        'thr_on': hp.uniform('thr_on', 3, 4.5),
        'thr_off': hp.uniform('thr_off', 0.1, 2)
    }

    trials = Trials()
    best = fmin(fn=evaluate_thresholds, space=space, algo=tpe.suggest, max_evals=50, trials=trials)

    # Optimal thresholds found
    best_thr_on = float(best['thr_on'])
    best_thr_off = float(best['thr_off'])
    on_off = np.array(trigger_onset(cft, best_thr_on, best_thr_off))

    # Seismic detection flag
    seismic_detected = 1 if len(on_off) > 0 else 0

    # If events are detected, save the results
    if seismic_detected == 1:
        # Filename and start time
        fname = os.path.basename(mseed_file)  # File name
        print(fname)
        detection_times = []
        fnames = []

        # Iterate over the detected events
        for i in range(len(on_off)):
            triggers = on_off[i]
            on_time = starttime + timedelta(seconds=tr_times[triggers[0]])
            on_time_str = datetime.strftime(on_time, '%Y-%m-%dT%H:%M:%S.%f')
            detection_times.append(on_time_str)
            fnames.append(fname)

        # Create a DataFrame with the detections
        detect_df = pd.DataFrame({
            'filename': fnames,
            'time_abs(%Y-%m-%dT%H:%M:%S.%f)': detection_times,
            'time_rel(sec)': [tr_times[triggers[0]] for triggers in on_off]
        })

        # Save the results to a CSV file
        output_file = "detections.csv"  # You can change the path of the output file
        detect_df.to_csv(output_file, mode='a', header=False, index=False)  # 'a' to append without overwriting
        print(f"Detections saved in {output_file}")
    
    else:
        print(f"No seismic events detected in {mseed_file}")
    
    filename=mseed_file

    return filename, seismic_detected

process_files_from_csv(file_list, directories)
