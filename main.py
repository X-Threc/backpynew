import easyocr
import cv2

import translators as ts
import torch
print(torch.cuda.is_available())


def recognize_text(img_path, to_lang, from_lang):
    img_1 = cv2.imread(img_path)
    img_1 = cv2.cvtColor(img_1, cv2.COLOR_BGR2RGB)

    reader = easyocr.Reader([to_lang, from_lang])
    data = reader.readtext(img_path)
    print(data)
    finding_text = ''
    datanew=[]
    for (bbox, text, prob) in data:
        if prob > 0.2:
            (top_left, top_right, bottom_right, bottom_left) = bbox
            top_left = (int(top_left[0]), int(top_left[1]))
            bottom_right = (int(bottom_right[0]), int(bottom_right[1]))
            img = cv2.rectangle(img_1, top_left, bottom_right, (0, 255, 0), 2)
            finding_text = finding_text + text + ' '
            datanew.append((bbox, text, prob))
    cv2.imshow('img', img)

    return (datanew, finding_text)


def translate_string(image_path, to_lang, from_lang):
    find_text = recognize_text(image_path, to_lang, from_lang)
    for text in find_text[0]:
        text_translate = ts.google(text[1], to_language=to_lang, from_language=from_lang)
        print(text_translate)
    print("ожидание перевода...")
    # input languages
    print(find_text[1])
    print("перевод получен")


if __name__ == "__main__":

    from_lang = 'ru'
    to_lang = 'en'
    img_path = 'res/4.png'

    if img_path.lower().endswith(('.jpg', '.jpeg', '.png')):
        translate_string(img_path, to_lang, from_lang)
        cv2.waitKey(0)
    else:
        print("неверный тип данных")


