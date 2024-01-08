import './style.css'

interface Todo {
  title: string;
  isCompleted: boolean;
  id: string;
}

const todos:Array<Todo>=[];

const todosContainer = document.querySelector(".todoContainer") as HTMLDivElement;

const todoInput = document.getElementsByName("title")[0] as HTMLInputElement;

const myForm = document.getElementById("myForm") as HTMLFormElement;

const deleteTodo = (id: String) => {
  const idx = todos.findIndex(item=>item.id===id);
  todos.splice(idx,1);
  renderTodo(todos);
}

const generateToDoItem = (item: Todo) =>{
  const todo:HTMLDivElement = document.createElement("div");
  todo.className = "todo";

  const checkBox:HTMLInputElement = document.createElement("input");
  checkBox.setAttribute("type","checkbox");
  checkBox.className = "isCompleted";
  checkBox.checked = item.isCompleted;
  

  const paragraph: HTMLParagraphElement = document.createElement("p");
  paragraph.innerText = item.title;
  paragraph.className = item.isCompleted? "textCut": "";
  checkBox.onchange = () => {
    if(checkBox.checked){
      item.isCompleted = true;
    }else{
      item.isCompleted = false;
    }
    renderTodo(todos);
  }

  const btn: HTMLButtonElement = document.createElement("button");
  btn.innerText = "x";
  btn.className = "deleteBtn";
  btn.onclick = () => {

    deleteTodo(item.id);
  }

  todo.append(checkBox, paragraph, btn);
  todosContainer.append(todo);

}

const renderTodo = (todos: Todo[]) =>{
  todosContainer.innerText = "";
    todos.forEach(item => {
      generateToDoItem(item);
    })
}

myForm.onsubmit = (e: SubmitEvent) =>{
  e.preventDefault();

  const todo:Todo = {
    title: todoInput.value,
    isCompleted: false,
    id: String(Math.random()*1000),
  };

  todos.push(todo);
  todoInput.value = "";
  renderTodo(todos);
}






