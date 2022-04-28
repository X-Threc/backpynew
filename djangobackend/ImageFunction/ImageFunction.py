import easyocr
import cv2
import translators as ts
import torch
from djangobackend.settings import MEDIA_ROOT
print(torch.cuda.is_available())


def recognize_text(img_path, to_lang, from_lang):

    img_path="media/"+img_path
    img_1 = cv2.imread(img_path)
    print(img_path)

    img_1 = cv2.cvtColor(img_1, cv2.COLOR_BGR2RGB)
    reader = easyocr.Reader([to_lang, from_lang])
    data = reader.readtext(img_path)
    finding_text = ''
    datanew=[]
    for (bbox, text, prob) in data:
        if prob > 0.5:
            print((bbox, text, prob))
            (top_left, top_right, bottom_right, bottom_left)\
                = bbox
            top_left = (int(top_left[0]), int(top_left[1]))
            bottom_right = (int(bottom_right[0]), int(bottom_right[1]))
            img = cv2.rectangle(img_1, top_left, bottom_right,
                                (0, 255, 0), 2)
            finding_text = finding_text + text + ' '

            datanew.append((bbox, text, prob))
    # cv2.imshow('img', img)
    print(finding_text)

    return (datanew, finding_text)


def translate_string(image_path, to_lang, from_lang):
    find_text1 = recognize_text(image_path, to_lang, from_lang)
    text_translate = ""
    for find_text in find_text1[0]:
        text_translate = text_translate + ts.google(find_text[1], to_language=to_lang, from_language=from_lang)+" "
    return text_translate

# url="\\uploads\\rDlhO3blSQr1tbGvtzCVWrOprdvtZJCLWfKL65fis-TpL8lhEgTdVyA7Z8qK5_JbHnFW-K_EEGtLjLhtuc9wLyJI.jpg"
# print(translate_string(url,to_lang="en",from_lang="ru"))

