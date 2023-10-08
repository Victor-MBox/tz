/* Модальные окна  *****************************************  */

// Ждем, пока загрузится весь html документ
// далее добавляем слушатели на наши интерактивные элементы
// выдаем класс active при клике на нашу кнопку
// предотвращаем всплытие события в модальном окне до оверлея
// удаляем класс при клике на крестик и перекрытие
// удаляем класс при нажании на Esc

document.addEventListener('DOMContentLoaded', () => {
	const btn = document.querySelector('.btn'),
	      modal = document.querySelector('.modal'),
	      overlay = document.querySelector('.modal__overlay'),
	      close = document.querySelector('.modal__close'),
	      modalWindow = document.querySelector('.modal-window');


	const closeModal = () => {
		modal.classList.remove('active')
	}

	btn.addEventListener('click', () => {
		modal.classList.add('active')
	})

	close.addEventListener('click', closeModal)
	overlay.addEventListener('click', closeModal)

    modalWindow.addEventListener('click', (e) => {
			e.stopPropagation()
		})

	document.addEventListener('keydown', event => {
		if (event.key === 'Escape' || event.code === 'Escape') {
			closeModal()
		}
	})
})


/* Отправка формы ***************************************** */
// проверяем заполненные поля и отправляем данные в файл mailer.php и показываем окно - спасибо
// предотвращаем повторную отправку письма

$(document).ready(function () {
	var isFormValid = true

	$('#form').validate({
		rules: {
			email: {
				email: true,
			},
			phone: 'required',
		},
		messages: {
			email: {
				email: 'Неправильно введен email',
			},
			phone: 'Введите телефон',
		},
	})

    if ($('#form').length) {
		$('#form').submit(function (e) {
			e.preventDefault()

			var form = $(this)

			if (!form.valid() || !isFormValid) {
				return
			}

			$.ajax({
				type: 'POST',
				url: 'mailer/smart.php',
				data: form.serialize(),
			}).done(function () {
				form.find('input').val('')
				$('#mainModal').fadeOut()
				$('.modal__overlay, #thanksModal').fadeIn()
				form[0].reset()
				submitButton.val(originalButtonText).prop('disabled', false)
			})

			return false
		})
	}
})

// Маска номера телефона
// блокировка ввода букв
// сообщение об ошибке ввода
$('input[name=phone]').mask('+7 (999) 999-99-99')
