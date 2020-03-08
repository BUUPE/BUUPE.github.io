const axios = require('axios')

export class Class {
  constructor(className, db) {
    this.className = className;
	this.db = db;
	this.members = [];
	axios.get(`/api/getClass/${this.db}`).then(response => this.members = response.data);
  }
  
  get getClassName() {
	  return this.className;
  }
  get getClassName() {
	  return this.members;
  }
}