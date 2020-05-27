import cv2
frameWidth = 640
frameHeight = 480
PlateCascade = cv2.CascadeClassifier("/Users/elgstrom/Desktop/Program/python/face/haarcascades/haarcascade_russian_plate_number.xml")
minArea = 10
color = (255,0,255)


cap = cv2.VideoCapture(0)
cap.set(3, frameWidth)
cap.set(4, frameHeight)
cap.set(10,150)
count = 0

while True:
    success, img = cap.read()
    imgGray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    numberPlates = PlateCascade.detectMultiScale(imgGray, 1.1, 10)
    for (x, y, w, h) in numberPlates:
        area = w*h
        if area >minArea:
            cv2.rectangle(img, (x, y), (x + w, y + h), (255, 0, 255), 2)
            cv2.putText(img,"Number Plate",(x,y-5),
                        cv2.FONT_HERSHEY_COMPLEX_SMALL,1,color,2)
            imgRoi = img[y:y+h,x:x+w]
            cv2.imshow("ROI", imgRoi)
            count +=1
            cv2.imwrite("Bilar/Bil"+str(count)+".jpg",imgRoi)
            cv2.waitKey(500)
            #cv2.imwrite("Bilar/Regg_"+str(count)+".jpg",imgRoi)

    cv2.imshow("Result", img)

    if cv2.waitKey(1) & 0xFF == ord('s'):
        break
     
