function Student(name, gender, age) {
  this.name = name;
  this.gender = gender;
  this.age = age;
  this.marks = [];
  this.subject = null;
}

Student.prototype.setSubject = function(subjectName) {
  this.subject = subjectName;
};

Student.prototype.addMarks = function(...marks) {
  if (this.marks === null) return;
  this.marks.push(...marks);
};

Student.prototype.getAverage = function() {
  if (!this.marks || this.marks.length === 0) return 0;
  const sum = this.marks.reduce((acc, mark) => acc + mark, 0);
  return sum / this.marks.length;
};

Student.prototype.exclude = function(reason) {
  this.subject = null;
  this.marks = null;
  this.excluded = reason;
};

window.Student = Student;
