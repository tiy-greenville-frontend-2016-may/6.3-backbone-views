var $ = require('jquery');
var views = require('./views/todo');
var TodoCollection = require('./models/todo').TodoCollection;

var todoCollection = new TodoCollection();

var instructions = new views.TodoInstructionView();
$('.app').append(instructions.render().el);

var todoList = new views.TodoListView({'collection': todoCollection});
$('.app').append(todoList.render().el);

todoCollection.add([
  {'title': 'Learn some backbone views'},
  {'title': 'Feed the dog'}
]);
