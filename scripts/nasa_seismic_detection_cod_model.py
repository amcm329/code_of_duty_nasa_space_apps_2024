# -*- coding: utf-8 -*-
"""NASA_Seismic_Detection_COD_Model.ipynb

Automatically generated by Colab.

Original file is located at
    https://colab.research.google.com/drive/1uY34ioBR9FgpY9nknrCfshFkr4XWNozk
"""

#Importing libraries
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
from sklearn.feature_selection import VarianceThreshold
from sklearn.model_selection import train_test_split
from xgboost import XGBClassifier
from sklearn.metrics import recall_score
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, LSTM
from imblearn.over_sampling import SMOTE
from sklearn.model_selection import RandomizedSearchCV
from sklearn.metrics import recall_score, precision_score, f1_score, accuracy_score, confusion_matrix, classification_report
pd.options.display.max_colwidth = 100
import os

"""### Processing Training Data"""

df_train_moon= pd.read_csv('/content/drive/MyDrive/NASA/data/training/df_train_moon.csv')
df_train=df_train_moon

#df_train= pd.read_csv('/content/drive/MyDrive/NASA/data/training/df_train_moon_mars.csv')
#df_train = df_train[df_train['test'] == 0]

df_train.head()

print(df_train['seismic_detected'].value_counts())
print(df_train['test'].value_counts())
print(df_train['source'].value_counts())

"""### Oversampling"""

# Split into features and target variable
X_train = df_train.drop(columns=["seismic_detected","filename", "source"])
y_train = df_train["seismic_detected"]

# Apply SMOTE
smote = SMOTE(random_state=42)
X__train_resampled, y_train_resampled = smote.fit_resample(X_train, y_train)

# Print class distribution after SMOTE
print("Class distribution after SMOTE:")
print(pd.Series(y_train_resampled).value_counts())

"""### Classification with XGBoost"""

# Preprocessing and preparation
X = X__train_resampled
y = y_train_resampled
# Standardize the features
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# PCA for dimensionality reduction
pca = PCA(n_components=0.9)  # Keep 90% of variance
X_pca = pca.fit_transform(X_scaled)

# Feature selection based on variance threshold
selector = VarianceThreshold(threshold=0.05)  # Remove features with variance below 5%
X_selected = selector.fit_transform(X_pca)

# Split into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X_selected, y, test_size=0.2, random_state=42)

# Train XGBoost classifier
xgb = XGBClassifier()
xgb.fit(X_train, y_train)

# Predict on training set and evaluate recall
y_pred_train = xgb.predict(X_train)
recall_train = recall_score(y_train, y_pred_train)
print("Recall on training set:", recall_train)

# Predict on testing set and evaluate recall
y_pred_test = xgb.predict(X_test)
recall_test = recall_score(y_test, y_pred_test)
print("Recall on testing set:", recall_test)

"""##### Hyperparameter Tuning & Evaluation"""

# Define the parameter grid for random search
param_grid = {
    'learning_rate': [0.01, 0.05, 0.1],
    'n_estimators': [100, 200, 500],
    'max_depth': [4, 6, 8],
    'min_child_weight': [1, 3, 5],
    'gamma': [0, 0.1, 0.5]
}

# Create a RandomSearchCV object with XGBoost classifier
xgb_model = XGBClassifier()
random_search = RandomizedSearchCV(estimator=xgb_model, param_distributions=param_grid, n_iter=50, cv=5, scoring='recall', random_state=42)

# Train the model with random search
random_search.fit(X_train, y_train)

# Print the best parameters found by RandomSearchCV
print("Best parameters:", random_search.best_params_)

# Get the best model from the search
best_xgb = random_search.best_estimator_

# Predict on training set and evaluate recall
y_pred_train = best_xgb.predict(X_train)
recall_train = recall_score(y_train, y_pred_train)
print("Recall on training set:", recall_train)

# Evaluate the best model on testing set
y_pred_test = best_xgb.predict(X_test)
recall_test = recall_score(y_test, y_pred_test)
print("Recall on testing set with best parameters:", recall_test)

# Print other important metrics
print("Precision on testing set:", precision_score(y_test, y_pred_test))
print("F1-score on testing set:", f1_score(y_test, y_pred_test))
print("Accuracy on testing set:", accuracy_score(y_test, y_pred_test))
print("Confusion Matrix:\n", confusion_matrix(y_test, y_pred_test))
print("Classification Report:\n", classification_report(y_test, y_pred_test))

"""### Classification with RNN"""

# Preprocessing and preparation
X = X__train_resampled
y = y_train_resampled

# Standardize the features
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# PCA for dimensionality reduction
pca = PCA(n_components=0.9)  # Keep 90% of variance
X_pca = pca.fit_transform(X_scaled)

# Feature selection based on variance threshold
selector = VarianceThreshold(threshold=0.05)  # Remove features with variance below 5%
X_selected = selector.fit_transform(X_pca)

# Reshape data for RNN
X_selected = X_selected.reshape(X_selected.shape[0], X_selected.shape[1], 1)

# Split into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X_selected, y, test_size=0.2, random_state=42)

# Create RNN model
model = Sequential()
model.add(LSTM(units=64, return_sequences=True, input_shape=(X_train.shape[1], X_train.shape[2])))
model.add(LSTM(units=32))
model.add(Dense(1, activation='sigmoid'))

# Compile the model
model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy','recall'])

# Train the model
model.fit(X_train, y_train, epochs=10, batch_size=32)

# Predict on training set and evaluate recall
y_pred_train = model.predict(X_train) > 0.5

# Predict on testing set and evaluate recall
y_pred_test = model.predict(X_test) > 0.5

"""##### Evaluation"""

# Print other important metrics for RNN
print("Precision on testing set:", precision_score(y_test, y_pred_test))
print("F1-score on testing set:", f1_score(y_test, y_pred_test))
print("Accuracy on testing set:", accuracy_score(y_test, y_pred_test))
print("Confusion Matrix:\n", confusion_matrix(y_test, y_pred_test))
print("Classification Report:\n", classification_report(y_test, y_pred_test))

"""### Processing Test Data"""

df_test1 = pd.read_csv('/content/drive/MyDrive/NASA/data/training/df_train_mars.csv')
df_test2 = pd.read_csv('/content/drive/MyDrive/NASA/data/test/S12_gradeB.csv')
df_test3 = pd.read_csv('/content/drive/MyDrive/NASA/data/test/S15_GradeA.csv')
df_test4 = pd.read_csv('/content/drive/MyDrive/NASA/data/test/S15_GradeB.csv')
df_test5 = pd.read_csv('/content/drive/MyDrive/NASA/data/test/S16_GradeA.csv')
df_test6 = pd.read_csv('/content/drive/MyDrive/NASA/data/test/S16_GradeB.csv')

df_test1 = df_test1[df_test1['test'] == 1] #We choose the test data from this df

df_test1.head()

frames = [df_test1, df_test2, df_test3,df_test4,df_test5,df_test6]
df_test = pd.concat(frames)

df_test['filename'] = df_test['filename'].apply(lambda x: os.path.basename(x))
df_test.head()

print(df_test['seismic_detected'].value_counts())
print(df_test['test'].value_counts())
print(df_test['source'].value_counts())

X_test_real = df_test.drop(columns=["seismic_detected","filename","source"])
X_test_real_scaled = scaler.transform(X_test_real)
X_test_real_pca = pca.transform(X_test_real_scaled)
X_test_real_selected = selector.transform(X_test_real_pca)

"""### Predictions on Test Dataset"""

y_pred_real = best_xgb.predict(X_test_real_selected)

y_pred_real

# Create a new DataFrame with filename and predictions
results_df = pd.DataFrame({'filename': df_test['filename'], 'seismic_detected': y_pred_real})
results_df = results_df[results_df['seismic_detected'] == 1]

# Export the results to a CSV file
results_df.to_csv('/content/drive/MyDrive/NASA/data/predictions.csv', index=False)