class Game{
	// Размер игрового поля
	_size;

	// Массив чисел от 1 до 16 (используется для разбиения на случайные пары)
	_range = [];

	// Индикатор хода игрока
	_isTurn = false;

	// Пара ячеек во время хода (в зависимости от первого числа)
	_currentPair = {};
	// Первое число текущей пары
	_firstNumber = null;

	// Список всех пар чисел
	_pairsOfCells = [];

	// Ячейки, которые пользователь раскрасил	
	// УСЛОВИЕ ПОБЕДЫ => количество этих ячеек == общее количество ячеек
	_selectedCells = [];

	// Запущена ли игра
	_isRunnig = false;

	// Время начала игры
	_startTime = null;
	// Текущая длительность игры
	_currentTime = null;
	// Ссылка на DOM элемент для обновления времени
	_timeLabel = null;
	// ID таймера
	_mainTimerID = null;

	// Цвета
	_colors = [
		'#2ecc71', '#8e44ad', '#f1c40f', '#c0392b', 
		'#34495e', '#1abc9c', '#7f8fa6', '#2f3640'
	]

	constructor(size){
		this._size = size;
		this.range = size ** 2;
		this._generateInterface();
		this._getPairsOfNumbers();
	}

	_isPlayerWin(){
		/* Возвращает true если игрок выполнил условие победы */
		return this._selectedCells.length == this._size ** 2;
	}

	_tick(){
		this._startTime = new Date();

		let mainTimerID = setInterval(() => {
			const currentTime = new Date();
			const delta = currentTime.getTime() - this._startTime.getTime();
			
			let seconds = (delta / 1000).toFixed(0);
			let minutes = Math.floor(seconds / 60);

			let time;
			if (seconds < 60){
				time = `00 мин. ${seconds} сек.`;
			} else {
				seconds = seconds - (minutes * 60)
				time = `${minutes} мин. ${seconds} сек.`;
			}
			
			this._currentTime = time;
			this._timeLabel.innerHTML = time;
		}, 500)
		this._mainTimerID = mainTimerID;
	}

	_restart(){
		const container = document.querySelector('.game');
		container.innerHTML = '';
		this._generateInterface();

		this._currentPair = {};
		this._firstNumber = null;
		this._pairsOfCells = [];
		this._selectedCells = [];

		this._getPairsOfNumbers();
		this._tick();

	}

	_findPairByNumber(number){
		this._pairsOfCells.forEach((pair, i) => {
			if (pair.includes(parseInt(number))){
				this._currentPair.pair = pair;
				this._currentPair.colorIndex = i;
			}
		})
	}

	_findColorByNumber(number){
		let color;
		this._pairsOfCells.forEach((pair, i) => {
			if (pair.includes(parseInt(number))){
				color = this._colors[i];
			}
		})
		return color;
	}

	_splicePairFromPairs(){
		for (let i = 0; i < this._pairsOfCells.length; i++){
			const pair = this._pairsOfCells[i];
			if (pair.includes(this._currentPair.pair[0])){
				this._pairsOfCells.splice(i, 1);
			}
		}
	}

	_checkColor(cellNumber){
		if (!this._isTurn){
			
			this._findPairByNumber(cellNumber);

			const cell = document.querySelector(`[data-number="${cellNumber}"]`)
			cell.style.backgroundColor = this._colors[this._currentPair.colorIndex]
			
			this._isTurn = true;
			this._selectedCells.push(cellNumber)
			this._firstNumber = parseInt(cellNumber);
		} else {
			let secondNumber;

			this._currentPair.pair.forEach(n => {
				if (n !== this._firstNumber){
					secondNumber = n;
				}
			})

			const cell = document.querySelector(`[data-number="${cellNumber}"]`);
			if (parseInt(cellNumber) === secondNumber){
				cell.style.backgroundColor = this._colors[this._currentPair.colorIndex]

				this._isTurn = false;
				this._selectedCells.push(cellNumber)

				if (this._isPlayerWin()){
					setTimeout(() => {
						alert(`Вы выиграли! Затраченное время ${this._currentTime}`)
						clearInterval(this._mainTimerID)
					}, 0)
				}
			} else {
				const color = this._findColorByNumber(cellNumber); 
				cell.style.backgroundColor = color;
				this._isTurn = true;

				setTimeout(() => {
					cell.style.backgroundColor = 'white';
				}, 200)
			}
		}
	}

	set range(value){
		this._range = Array.from({
			length: value
		}, (v, k) => k + 1)
		return true;
	}

	_setNumbers(){
		/* Задает каждой ячейке порядковый номер */
		const cells = document.querySelectorAll('.cell');

		for (let i = 0; i < cells.length; i++){
			const cell = cells[i];
			cell.dataset['number'] = i + 1;
		}
	}

	_getPairsOfNumbers(){
		/* Получает пары случайных чисел */
		const pairs = [];
		this._range.sort(() => {
			return Math.random() - .5;
		})
		
		for (let i = 0; i < this._range.length; i++){
			if (i % 2 == 0){
				const newPair = this._range.slice(i, i + 2);
				pairs.push(newPair);
			}
		}

		this._pairsOfCells = pairs;
	}

	_randomSortColors(){
		/* Перетасовывает цвета случайным образом */
		this._colors.sort(() => {
			return Math.random() - .5;
		})
	}

	_generateInterface(){
		/* Создает начальный интерфейс игры */
		const container = document.querySelector('.game');
		
		const table = document.createElement('table');
		container.append(table);
		for (let i = 0; i < this._size; i++){
			const row = document.createElement('tr');
			for (let j = 0; j < this._size; j++){
				const td = document.createElement('td');
				td.classList.add('cell')
				td.addEventListener('click', () => {
					if (this._isRunnig){
						this._checkColor(td.dataset['number']);
					} else {
						alert('Сначала начните новую игру!')
					}
				})
				row.append(td);
			}
			table.append(row);
		}
		this._setNumbers();

		const btn = document.createElement('button');
		btn.classList.add('btn-game')
		btn.innerHTML = 'Играть';
		btn.addEventListener('click', () => {
			this._restart();
			this._isRunnig = true;
		})
		container.append(btn)


		const timeLabel = document.createElement('p');
		timeLabel.innerHTML = '00 мин. 00 сек.'
		this._timeLabel = timeLabel;
		container.append(timeLabel)
	}
}

window.onload = function () {
	const game = new Game(4);
}