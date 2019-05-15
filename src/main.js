class Game{
	// Размер игрового поля
	_size;

	_range = [];

	_isTurn = false;
	_currentPair = {};
	_firstNumber = null;
	_pairsOfCells = [];

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

	start(){
		console.log('Поехали!')
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
			cell.innerHTML = i + 1;
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
					this._checkColor(td.dataset['number']);
					console.log(this._currentPair)
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
			this.start();
		})
		container.append(btn)



	}
}

window.onload = function () {
	const game = new Game(4);
}