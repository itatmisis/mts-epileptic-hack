import cv2


def blur_video(input_path, output_path):
    # загрузка видеофайла
    cap = cv2.VideoCapture(input_path)

    # Определяем размеры кадра
    frame_width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    frame_height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    blur_ksize = (25, 25)

    # Создаем объект для записи видеофайла
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    out = cv2.VideoWriter(output_path, fourcc, 25.0, (frame_width, frame_height))

    # Инициализируем переменные
    prev_frame = None
    prev_gray = None
    threshold = 2100

    # Читаем видеофайл по кадрам
    while cap.isOpened():
        # Считываем текущий кадр
        ret, frame = cap.read()
        if not ret:
            break

        # Переводим кадр в градации серого
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

        # Если это не первый кадр
        if prev_frame is not None:
            # Считаем разницу между текущим и предыдущим кадром
            diff = cv2.absdiff(gray, prev_gray)

            # Вычисляем сумму всех изменений на кадре
            diff_sum = diff.sum()

            # Если сумма изменений превышает пороговое значение
            if diff_sum > threshold:
                # Находим контуры измененных участков на кадре
                contours, _ = cv2.findContours(diff, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

                # Отмечаем каждый контур на кадре зеленым прямоугольником
                for contour in contours:
                    (x, y, w, h) = cv2.boundingRect(contour)
                    roi = frame[y:y + h, x:x + w]
                    roi_blur = cv2.blur(roi, blur_ksize)
                    frame[y:y + h, x:x + w] = roi_blur

            # Записываем текущий кадр в выходной видеофайл
            out.write(frame)

        # Показываем кадр с отмеченными изменениями
        cv2.imshow('frame', frame)

        # Сохраняем текущий кадр и градации серого для следующей итерации
        prev_frame = frame.copy()
        prev_gray = gray

        # Обработка событий клавиатуры
        key = cv2.waitKey(1)
        if key == ord('q'):
            break

    # Освобождаем ресурсы и закрываем окна
    cap.release()
    out.release()
    cv2.destroyAllWindows()


blur_video('BigBuckBunny.mp4', 'aaa.mp4')
