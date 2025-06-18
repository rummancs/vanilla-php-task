document.addEventListener('DOMContentLoaded', loadTasks);

// for every task this will keep track through json
function addTask() {
  const task = document.getElementById('taskInput').value; // getting the data
  // posting by php page
    fetch('api.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'add', task })
  }).then(() => {
    document.getElementById('taskInput').value = '';
    loadTasks();
  });
}

// show all with links to remove after work
function loadTasks() {
  fetch('api.php?action=read')
    .then(res => res.json())
    .then(data => {
      const taskList = document.getElementById('taskList');
      taskList.innerHTML = '';
      data.forEach((task, index) => {
        taskList.innerHTML += `<li><button onclick="deleteTask(${index})">Delete</button> - ${task}</li>`;
      });
    });
}


// remove one by one ?
function deleteTask(index) {
  // confirmation dialog
  var confirm_answer = confirm("Are you sure you want to delete this item? This action cannot be undone.");
  if (confirm_answer) 
  {  
    fetch('api.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'delete', index })
    }).then(() => loadTasks());
    //alert("Thanks for finishing the task!");
  }
  else
  {
    alert("Declined the Delete action.");  
  }
}

// update today's date in a presenting manner
function showdate()
{
    const date = new Date();
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            const time = date.toLocaleTimeString();
            const day = date.toLocaleDateString(undefined, options);
            document.getElementById('whattime').innerHTML =
                `(${day}, Current Time: ${time})`;
        }

setInterval(showdate, 2000);
showdate();