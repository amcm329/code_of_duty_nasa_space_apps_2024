<img align="left" src="static/logo/nasa_logo.png" width="120 px" height="90 px"> 
<img align="right" src="static/logo/waverse_logo.png" width="120 px" height="70 px">
<h1> <p align="center">NASA Space Apps Challenge 2024</p> </h1> 

<br>
<br>

**WAVERSE** is an Artificial Intelligence end-to-end pipeline that first identifies potential seismic events and then extracts features for deeper analysis.
			
By processing NASA data from the Moon and Mars, the project employs the following models to classify seismic events:

- XGBoost 
- Recurrent Neural Network (RNN)

After this, we get the catalog’s information for each observation that our best classifier predicts as seismic.
			
The final output is a catalog of true seismic events along with detailed plots for analysis which are deployed in an user-friendly interface.

The dataset used in this project is seismic data from NASA’s Apollo and Mars InSight Lander missions, which provide raw seismic recordings from the Moon and Mars, respectively. 

These datasets were essential in training and testing the machine learning models. Our project is aligned with NASA’s goal of understanding the seismic activity of celestial bodies.

----
## Project Structure

The project is organized with the following folder structure:

```
.
├── scripts/        # Scripts used for the creation and deploy of the dashboard
├── src/            # All the notebooks and datasets necessary for the pre-processing and training.
├── static/         # All images used in the project
├── css/            # Style files for the dashboard.
├── index.html      # Main page of the dashboard. 
├── .gitignore
├── .project-metadata.yaml
├── LICENSE.txt
└── README.md
```

## Deploying 

Based on Github pages, we have been able to 

----
### **Note**
In general, the project contains mechanisms to guarantee a safe execution but if anything happens, it would be desirable to check both the [documentation](CECALT%20Hurricane%20Behavior%20Predictor_SOP.pdf) and the [technical configuration](scripts/README.md).

----
### **IMPORTANT**
DO NOT remove cdsw-build.sh as it will cause troubles in the model deployment.
