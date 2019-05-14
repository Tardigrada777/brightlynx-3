class Game{
	// Размер игрового поля
	_size;

	_range = [];

	// Цвета
	_colors = [
		'#2ecc71', '#8e44ad', '#f1c40f', '#c0392b', 
		'#34495e', '#1abc9c', '#7f8fa6', '#2f3640'
	]

	constructor(size){
		this._size = size;
		this.range = size ** 2;
		this._generateInterface();
	}

	start(){
		console.log('Поехали!')
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

	_getRandomNumber(Max){
		/* Генерирует случайное число в диапазоне от 0 до Max */
		return Math.round(Math.random() * (Max - 1)) + 1;
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
				row.append(td);
			}
			table.append(row);
		}
		this._setNumbers();

		const btn = document.createElement('button');
		btn.classList.add('btn-game')
		btn.innerHTML = 'Играть';
		btn.addEventListener('click', () => {
			this._getPairsOfNumbers();
		})
		container.append(btn)



	}
}

window.onload = function () {
	const game = new Game(4);
}