<img align="left" src="static/logo/nasa_logo.png" width="120 px" height="90 px"> 
<img align="right" src="static/logo/waverse_logo.png" width="120 px" height="70 px">
<h1> <p align="center">NASA Space Apps Challenge 2024</p> </h1> 

<br>
<br>

**WAVERSE** is an Artificial Intelligence end-to-end pipeline that first identifies potential seismic events and then extracts features for deeper analysis.
			
By processing NASA data from the Moon and Mars, the project employs the following models to classify seismic events:

- XGBoost 
- Recurrent Neural Network (RNN)

**Note: these were trained by using Google Colab and in the case of RNN, the GPU option.**

<br>

After this, we get the catalog’s information for each observation that our best classifier predicts as seismic.
			
The final output is a catalog of true seismic events along with detailed plots for analysis which are deployed in an user-friendly interface.

The dataset used in this project is seismic data from NASA’s Apollo and Mars InSight Lander missions, which provide raw seismic recordings from the Moon and Mars, respectively. 

These datasets were essential in training and testing the machine learning models. 

Our project is aligned with NASA’s goal of understanding the seismic activity of celestial bodies.

----
## Project Structure

The project is organized with the following folder structure:

```
.
├── src/            # All the notebooks and datasets necessary for the pre-processing and training.
├── scripts/        # Scripts used for the creation and deployment of the dashboard
├── static/         # All images used in the project. It also includes both training and testing images.
├── css/            # Style files for the dashboard.
├── index.html      # Main page of the dashboard. 
├── LICENSE.txt
└── README.md
```

Regarding the final file with all the predictions, it can be found ![here](src/all_predictions.csv) 

## Deployment

The deployment in this case consists in the visualization of all elements that we have considered throughout this project's development. 

Based on Github Pages service, we have been able to come up with a simple yet efficient hosting, which is available ![here](https://amcm329.github.io/codeofduty_nasa_space_apps_2024/)

All summarizations and important visual aspects are included in order to facilitate data comprehension.

Given its limited resources, additional technical and analytical features are out of this scope, nevertheless, you can find them ![here](src/)

----
### **Note**
Because of the nature of data available, especially for Mars regarding its training set, we've mixed all of the data available and created one single analysis.

----
### **Authors**

<center>			
	<table>
               <tr>
                   <th><h2><a href="https://www.linkedin.com/in/amcm329/">Aaron Castillo</a></h2></th>
                   <th><h2><a href="https://www.linkedin.com/in/gilberto-s-a64757121/">Gilberto Subias</a></h2></th>
                   <th><h2><a href="https://www.linkedin.com/in/javier-amiel-irais-s%C3%A1nchez-silva-86a309167/">Javier Sanchez</a></h2></th>
               </tr>
               <tr>
	           <td> <img src="static/team/Aaron_Castillo.jpg" width="250 px" height="250 px"> </td>
                   <td> <img src="static/team/Gilberto_Subias_Garcia.jpeg" width="250 px" height="250 px"> </td>
                   <td> <img src="static/team/Javier_Sanchez.png" width="250 px" height="250 px"> </td>
               </tr>	   
        </table>			
</center>
