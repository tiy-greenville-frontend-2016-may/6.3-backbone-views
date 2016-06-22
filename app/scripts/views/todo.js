var Backbone = require('backbone');
var todoItemTemplate = require('../templates/todo-item.hbs');

var TodoInstructionView = Backbone.View.extend({
  tagName: 'p',
  attributes: {
    'id': 'instructions',
    'class': 'todo-instructions well col-md-12'
  },
  render: function(){
    this.$el.text('Please add your todos');
    return this;
  }
});

var TodoListView = Backbone.View.extend({
  tagName: 'ul',
  attributes: {
    'class': 'todo-items col-md-12 list-group'
  },
  initialize: function(){
    this.listenTo(this.collection, 'add', this.renderTodoItem);
  },
  render: function(){
    return this;
  },
  renderTodoItem: function(todo){
    var todoItem = new TodoItemView({model: todo});
    this.$el.append(todoItem.render().el);
  }
});

var TodoItemView = Backbone.View.extend({
  tagName: 'li',
  className: 'list-group-item',
  template: todoItemTemplate,
  events: {
    'click .clickme': 'complete'
  },
  initialize: function(){
    this.listenTo(this.model, 'destroy', this.remove);
    this.listenTo(this.model, 'changed', this.render);
    this.listenTo(this.model, 'change:visible', this.toggleVisible);
  },
  render: function(){
    var context = this.model.toJSON();
    var renderedHtml = this.template(context);

    this.$el.html(renderedHtml);

    return this;
  },
  remove: function(){
      this.$el.remove();
  },
  complete: function(){
    this.model.destroy();
  },
  toggleVisible: function(todo){
    this.$el.toggle();
  }
});



module.exports = {
  'TodoInstructionView': TodoInstructionView,
  'TodoListView': TodoListView
};
