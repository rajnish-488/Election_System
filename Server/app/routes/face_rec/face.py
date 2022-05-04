import numpy as np
import cv2 as cv2
import base64
import io
import face_recognition

class face_reco:
    
    def __init__(self):
        pass

    def base64toimg(self,img):
        img = bytes(img[23:], 'utf-8')
        im_bytes = base64.b64decode(img)
        im_arr = np.frombuffer(im_bytes, dtype=np.uint8)  # im_arr is one-dim Numpy array
        img2 = cv2.imdecode(im_arr, flags=cv2.COLOR_BGR2RGB)
        return img2

    def recognize(self,img1 ,img2):
        img1=self.base64toimg(img1)
        img2=self.base64toimg(img2)
        TOLERANCE = 0.6
        MODEL = 'hog'
        known_faces = []
        results=[]
        encoding = face_recognition.face_encodings(img1)[0]
        known_faces.append(encoding)
        locations = face_recognition.face_locations(img2, model=MODEL)
        encodings = face_recognition.face_encodings(img2, locations)
        for face_encoding, face_location in zip(encodings, locations):
            results = face_recognition.compare_faces(known_faces, face_encoding, TOLERANCE)
        return results
 