
let initalTodo = [
  { id: 1, todo: 'Buy milk.', complete: false, category: 'shopping' },
  { id: 2, todo: 'Clean the cat box.', complete: false, category: 'chores' },
  { id: 3, todo: 'Chips and salsa.', complete: true, category: 'House' },
  { id: 4, todo: 'Test Application', complete: false, category: 'School' },
  { id: 5, todo: 'Walk the Dog', complete: false, category: 'House' },
  { id: 6, todo: 'Check Email.', complete: true, category: 'Work' },
  { id: 7, todo: 'Push to GitHub', complete: false, category: 'school' },
  { id: 8, todo: 'Make Dinner', complete: true, category: 'house' },
  {
    id: 45,
    todo: 'Finish Homework for DGM 3760',
    complete: false,
    category: 'School',
  },
];
const getTodos = () => {
  fetch('http://calm-shelf-89866.herokuapp.com/alltodos'
  ,{
    method: 'get',
  }
  )
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch(function (err) {
      console.log(err);
    });
};

getTodos();

const LOCAL_KEY = 'todo.category';
const LOCAL_ID_KEY = 'category.id';
let initalTodos = JSON.parse(localStorage.getItem(LOCAL_KEY)) || initalTodo;
let selectedID = localStorage.getItem(LOCAL_ID_KEY);

const todoInput = document.querySelector('#todo-input');
const categoryInput = document.querySelector('#category-input');
const btn = document.querySelector('#add-button');
const input = document.querySelector('input');
const reset = document.querySelector('#reset');
// reset.textContent='clear'
//Clear Local Storage
reset.addEventListener('click', () => {
  localStorage.clear();
  location.reload();
});
//Get Todo Input
todoInput.addEventListener('keydown', (e) => {
  e.keyCode === 13 ? addTodo(e) : null;
});
//Get Category Input
categoryInput.addEventListener('keydown', (e) => {
  e.keyCode === 13 ? addTodo(e) : null;
});
// save function
function save() {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(initalTodos));
  localStorage.setItem(LOCAL_ID_KEY, selectedID);
  startTodos();
  allCategories();
  completed();
}
function toggleComplete() {}
btn.addEventListener('click', addTodo);

function addTodo() {
  if (todoInput.value !== '') {
    initalTodos.push({
      id: Math.floor(Math.random() * 200),
      todo: todoInput.value.trim(),
      complete: false,
      category: categoryInput.value
        ? categoryInput.value
        : 'No Category Entered',
    });

    todoInput.focus();
  } else {
    alert('must enter a todo, category is optional');
  }

  console.log(initalTodos);
  const notCompleted = document.querySelector('.notCompleted');
  notCompleted.textContent = '';
  todoInput.value = '';
  categoryInput.value = '';
  save();
}

function startTodos(e) {
  const holder = document.querySelector('.notCompleted');
  holder.textContent = '';
  initalTodos.map((todo) => {
    // selectors
    const notCompleted = document.querySelector('.notCompleted');
    const title1 = document.querySelector('.title1');
    // create elements
    const number = initalTodos.filter((item) => !item.complete);
    if (
      number.length === 0 ||
      number.length === undefined ||
      number.length == null
    ) {
      title1.textContent = 'You have completed all your todos';
    } else {
      title1.textContent =
        number.length > 1
          ? `You have ${number.length} Todo's to complete`
          : `You have ${number.length} Todo to complete`;
    }
    const newLi = document.createElement('li');
    const checkBtn = document.createElement('btn');
    const delBtn = document.createElement('btn');
    const itemCat = document.createElement('ol');
    // add clases
    checkBtn.classList.add('btn');
    delBtn.classList.add('btn');
    // set inner html
    checkBtn.innerHTML = '<i class="fa fa-check"></i>';
    delBtn.innerHTML = '<i class="fa fa-trash"></i>';
    // set text content
    newLi.textContent = todo.todo;
    itemCat.textContent = todo.category;
    // check for completed status
    if (!todo.complete) {
      notCompleted.appendChild(newLi);
      newLi.appendChild(checkBtn);
      newLi.appendChild(delBtn);
    }
    // button event listeners
    delBtn.addEventListener('click', function () {
      const parent = this.parentNode;
      const todotext = parent.textContent;
      const lookup = initalTodos.find((todo) => {
        return todotext === todo.todo;
      });
      // remove from original array if deleted
      initalTodos.splice(initalTodos.indexOf(lookup), 1);
      parent.remove();
      save();
    });
    // change completed status in original array if marked as complete
    checkBtn.addEventListener('click', function () {
      const parent = this.parentNode;
      const todotext = parent.textContent;
      const lookup = initalTodos.find((todo) => {
        return todotext === todo.todo;
      });
      const index = initalTodos.indexOf(lookup);
      console.log(initalTodos.indexOf(lookup));
      console.log(lookup);
      initalTodos[index]['complete'] = !initalTodos[index]['complete'];
      completed();
      parent.remove();
      save();
    });
  });
}

function completed(e) {
  const holder = document.querySelector('.Completed');
  holder.textContent = null;
  initalTodos.map((todo) => {
    const Completed = document.querySelector('.Completed');

    //make new list item
    const newLi = document.createElement('li');

    const checkBtn = document.createElement('btn');
    const delBtn = document.createElement('btn');
    checkBtn.classList.add('btn');
    delBtn.classList.add('btn');
    checkBtn.innerHTML = '<i class="fa fa-check-circle"></i>';

    delBtn.innerHTML = '<i class="fa fa-trash"></i>';
    newLi.textContent = todo.todo;
    const title2 = document.querySelector('.title2');
    // create elements
    const number = initalTodos.filter((item) => item.complete);
    if (
      number.length === 0 ||
      number.length === undefined ||
      number.length == null
    ) {
      title2.textContent = 'you have not completed any todos';
    } else {
      title2.textContent =
        number.length >= 1
          ? `You have Completed ${number.length} Todo's`
          : `You have Completed ${number.length} Todo`;
    }
    if (todo.complete) {
      Completed.appendChild(newLi);
      newLi.appendChild(checkBtn);
      newLi.appendChild(delBtn);
    }
    checkBtn.addEventListener('click', function () {
      const parent = this.parentNode;
      const todotext = parent.textContent;
      const lookup = initalTodos.find((todo) => {
        return todotext === todo.todo;
      });
      const index = initalTodos.indexOf(lookup);
      console.log(initalTodos.indexOf(lookup));
      console.log(lookup);
      initalTodos[index]['complete'] = !initalTodos[index]['complete'];
      // initalTodos.push(lookup);
      parent.remove();
      save();
    });
    delBtn.addEventListener('click', function () {
      const parent = this.parentNode;
      const todotext = parent.textContent;
      const lookup = initalTodos.find((todo) => {
        return todotext === todo.todo;
      });
      // remove from original array if deleted
      initalTodos.splice(initalTodos.indexOf(lookup), 1);
      parent.remove();
      save();
    });
  });
}

function allCategories() {
  const allcats = document.querySelector('.Categories');
  allcats.textContent = '';
  const eachCat = initalTodos.map((item) => {
    return item.category.toLocaleLowerCase();
  });
  const nodupes = Array.from(new Set([...eachCat]));

  for (const value of nodupes) {
    const allcats = document.querySelector('.Categories');

    const newLi = document.createElement('li');
    const delBtn = document.createElement('btn');
    // checkBtn.classList.add('btn');
    delBtn.classList.add('btn');
    delBtn.innerHTML = '<i class="fa fa-trash"></i>';
    newLi.textContent = `${value}`;
    newLi.classList.add('capital');
    allcats.appendChild(newLi);
    initalTodos.filter((todo) => {
      if (todo.category.toLocaleLowerCase() === value.toLocaleLowerCase()) {
        const items = document.createElement('ol');
        items.classList.add('itemHover');
        const check = document.createElement('btn');
        check.innerHTML = '<i class="fa fa-check"></i>';
        check.classList.add('checkStyle');
        items.textContent = todo.todo;
        items.classList.add('category-list');
        if (todo.complete) {
          items.appendChild(check);
        }
        newLi.appendChild(items);
        todo.complete
          ? items.classList.add('strike')
          : items.classList.add('black');
      }
    });
    const title3 = document.querySelector('.title3');
    if (initalTodos.length) {
      title3.textContent = 'Categories';
    } else {
      title3.textContent = 'No Categories to display';
    }
  }
}
save();
