class Game{
	// Размер игрового поля
	_size;

	// Цвета
	_colors = [
		'#2ecc71', '#8e44ad', '#f1c40f', '#c0392b', 
		'#34495e', '#1abc9c', '#7f8fa6', '#2f3640'
	]

	constructor(size){
		this._size = size;
		this._generateInterface();
	}

	start(){
		console.log('Поехали!')
	}

	_setNumbers(){
		/* Задает каждой ячейке порядковый номер */
		const cells = document.querySelectorAll('.cell');

		for (let i = 0; i < cells.length; i++){
			const cell = cells[i];
			cell.dataset['number'] = i + 1;
		}
	}

	_randomSortColors(){
		/* Перетасовывает цвета случайным образом */
		this._colors.sort(() => {
			return Math.random() - 1;
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
			this.start();
		})
		container.append(btn)



	}
}

window.onload = function () {
	const game = new Game(4);
}