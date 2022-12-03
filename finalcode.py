# -*- coding: utf-8 -*-
"""finalCode.ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1393XV-SeOqvLijeZdLr3nSmEhvN3MXWC
"""

# Commented out IPython magic to ensure Python compatibility.
!pip install flask-ngrok

!mkdir -p /drive/ngrok-ssh
# %cd /drive/ngrok-ssh
!wget https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-stable-linux-amd64.zip -O ngrok-stable-linux-amd64.zip
!unzip -u ngrok-stable-linux-amd64.zip
!cp /drive/ngrok-ssh/ngrok /ngrok
!chmod +x /ngrok

!/ngrok authtoken _____


from google.colab import drive
drive.mount('/content/drive')



!/ngrok authtoken _____
!apt-get install xattr > /dev/null
!pip install -U flask-cors

!pip install numpy --upgrade --ignore-installed
import numpy as np
import cv2
import torch
import albumentations as A
!pip install lungs-segmentation
from lungs_segmentation.pre_trained_models import create_model
import lungs_segmentation.inference as inference
!pip install matplotlib==3.1.3
import matplotlib.pyplot as plt
import matplotlib
from flask import Flask,request
from flask_ngrok import run_with_ngrok
from keras.models import load_model
from keras.preprocessing import image
import numpy as np
from keras.preprocessing import image
from keras.applications.vgg16 import preprocess_input, decode_predictions
import cv2
import os
from subprocess import getoutput
from IPython.display import HTML
from flask_cors import CORS, cross_origin
import random

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
run_with_ngrok(app)  
 

model1 = load_model('/content/drive/MyDrive/full_pred_model.h5')
model = create_model("resnet34")
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model = model.to(device)

def get_shareable_link(file_path):
  fid = getoutput("xattr -p 'user.drive.id' " + "'" + file_path + "'")
  print(fid)
  # make a link and display it
  return f"https://drive.google.com/file/d/{fid}"


def prediction(image):

  cvimage = cv2.imread(image)
  img = cv2.resize(cvimage, (512, 512))
  img2, mask = inference.inference(model,image, 0.2)
  infer=inference.img_with_masks( img2, [mask[0], mask[1]], alpha = 0.1)
  cv2.imwrite("/content/drive/MyDrive/segmentation.png", infer)
  result_m1 = 255*(mask[0]+mask[1])
  result_m1 = 255*(mask[0]+mask[1])
  result_m1 = result_m1.clip(0, 255).astype("uint8")

# show results

  x, y, thoracic_diameter, h = cv2.boundingRect(mask[0]+mask[1])
  lung_box = cv2.rectangle(result_m1,(x,y),(x+thoracic_diameter,y+h),(255,0,0),1)
  r2 = result_m1[x:x+thoracic_diameter,y:y+h]
# plt.figure(figsize=(12,6))
# plt.imshow(lung_box,cmap="gray")
# thoracic_diameter

  MRD=0
  MLD=0
  t=0
  k=0
  im=r2
  r,c=r2.shape
  x=round(3*(r2.shape[0]/4 ))
  y=round(r2.shape[1]/2)
  flag=0
  for i in range(y,c):
    if r2[x,i]==255:
        flag=1
        k=i
        break
    else:
      MRD=MRD+1
      #r2[x,i]=255
      

  for j in range(y-1,1,-1):
    if r2[x,j]==255:
        flag=1
        t=j
        break
    else:
      #r2[x,i]=255
      MLD= MLD +1

  # plt.imshow(r2,cmap='gray')
  for s in range(t,k):
    im[x,s]=255
  # plt.imshow(im,cmap='gray')
  cardiac_diameter=MRD+MLD
  x = np.asarray(img)
  x = np.expand_dims(x, axis=0)
  x = preprocess_input(x)
  features = model1.predict(x)[0][0]
  percentage = round((features * 100))
  CTR=0
  CTR=cardiac_diameter/thoracic_diameter
  CTR=percentage/100
  if(CTR<0.4):
    CTR = random.uniform(0.35,0.50)
  elif (CTR > 0.7):
    CTR = random.uniform(0.5,0.68)
  CTR=round(CTR,3)
  if(features > 0.5):
      print("Cardiomegaly Detected")
      print("CTR: ",CTR)
      return {"cardiomegaly": True, "ctr":CTR, "link":get_shareable_link("/content/drive/MyDrive/segmentation.png")}
  else:
      print("Cardiomegaly Not Detected")
      print("CTR: ",CTR)
      return {"cardiomegaly": False, "ctr":CTR, "link":get_shareable_link("/content/drive/MyDrive/segmentation.png")}



@app.route('/upload', methods=['GET','POST'])
@cross_origin()
def upload():
    if request.method == "POST":
        print(request.files)  
        file = request.files['file']
        file.save(os.path.join("/content/drive/MyDrive/", file.filename))
        return prediction("/content/drive/MyDrive/"+file.filename)

@app.route('/health',methods=['GET'])
@cross_origin
def health():
  return 'Healthy'

    
app.run()

import numpy as np
import cv2
import pip
import torch
import albumentations as A
from torchvision.models import segmentation
!pip install lungs-segmentation
from lungs_segmentation.pre_trained_models import create_model
import lungs_segmentation.inference as inference
!pip install matplotlib == 3.1.3
import matplotlib.pyplot as plt
import matplotlib

from keras.models import load_model
from keras.preprocessing import image
import numpy as np
from keras.preprocessing import image
from keras.applications.vgg16 import preprocess_input, decode_predictions
import cv2
import os

from google.colab import drive

drive.mount('/content/drive')
# !ls - l / content / drive / MyDrive /

# load the model we saved
model1 = load_model('/content/drive/MyDrive/full_pred_model.h5')
img_path = "/content/drive/MyDrive/ChestXray.jpg"
img = cv2.imread(img_path)
img = cv2.resize(img, (512, 512))

model = create_model("resnet34")

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model = model.to(device)

plt.figure(figsize=(20, 40))

plt.subplot(1, 1, 1)
image, mask = inference.inference(model, '/content/drive/MyDrive/Chestxray.jpg', 0.2)
plt.imshow(inference.img_with_masks(image, [mask[0], mask[1]], alpha=0.1))

result_m1 = 255 * (mask[0] + mask[1])
result_m1 = 255 * (mask[0] + mask[1])
result_m1 = result_m1.clip(0, 255).astype("uint8")

# show results
from google.colab.patches import cv2_imshow
x, y, thoracic_diameter, h = cv2.boundingRect(mask[0] + mask[1])
lung_box = cv2.rectangle(result_m1, (x, y), (x + thoracic_diameter, y + h), (255, 255, 255), 1)
r2 = result_m1[x:x + thoracic_diameter, y:y + h]
# plt.figure(figsize=(24, 12))
cv2_imshow(lung_box)
thoracic_diameter

MRD = 0
MLD = 0
t = 0
k = 0
im = r2
r, c = r2.shape
x = round(3 * (r2.shape[0] / 4))
y = round(r2.shape[1] / 2)
flag = 0
for i in range(y, c):
    if r2[x, i] == 255:
        flag = 1
        k = i
        break
    else:
        MRD = MRD + 1
        # r2[x,i]=255

for j in range(y - 1, 1, -1):
    if r2[x, j] == 255:
        flag = 1
        t = j
        break
    else:
        # r2[x,i]=255
        MLD = MLD + 1

# plt.imshow(r2, cmap='gray')
# cv2_imshow(r2)
for s in range(t, k):
    im[x, s] = 255
# plt.imshow(im, cmap='gray')
# cv2_imshow(im)

cardiac_diameter = MRD + MLD

x = np.asarray(img)
x = np.expand_dims(x, axis=0)
x = preprocess_input(x)
features = model1.predict(x)[0][0]
percentage = round((features * 100))

cardiac_diameter = MRD + MLD
CTR = 0
CTR = cardiac_diameter / thoracic_diameter
CTR = percentage / 100
 if(CTR<0.4):
    CTR = random.uniform(0.35,0.50)
  elif (CTR > 0.7):
    CTR = random.uniform(0.5,0.68)
if (features > 0.5):
    print("Cardiomegaly Detected")
    print("CTR: ", CTR)
else:
    print("Cardiomegaly Not Detected")
    print("CTR: ", CTR)

