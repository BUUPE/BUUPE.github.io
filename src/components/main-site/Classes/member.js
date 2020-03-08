export class Member {
	
  //Constructors
  constructor(name, email, classYear, imgFile, github, twitter, facebook, linkedin, position) {
    this.name = name;
	this.email = email;
	this.classYear = classYear;
	this.imgFile = imgFile;
	this.github = github;
	this.twitter = twitter;
	this.facebook = facebook;
	this.linkedin = linkedin;
	this.position = position;
  }
  
  static basicMember(name, email, classYear, imgFile){
    return new Member(name, email, classYear, imgFile, null, null, null, null, null);
  }
  
  static basicMemberWithPos(name, email, classYear, imgFile, position){
    return new Member(name, email, classYear, imgFile, null, null, null, null, position);
  }
  
  
  //Modifiers
  set setName(name) {
	this.name = name;
  }
  set setEmail (email) {
	this.email = email;
  }
  set setClassYear (classYear) {
	this.classYear = classYear;
  }
  set setImgFile (imgFile) {
	this.imgFile = imgFile;
  }
  set setGit(github) {
	this.github = github;
  }
  set setTwit(twitter) {
	this.twitter = twitter;
  }
  set setFace(facebook) {
	this.facebook = facebook;
  }
  set setIN(linkedin) {
	this.linkedin = linkedin;
  }
  set setPos(position) {
	this.position = position;
  }
  
  
  //Fetchers
  get getName() {
	return this.name;
  }
  get getEmail() {
	return this.email;
  }
  get getClassYear() {
	return this.classYear;
  }
  get getImgFile() {
	return this.imgFile;
  }
  get getGit() {
	return this.github;
  }
  get getTwit() {
	return this.twitter;
  }
  get getFace() {
	return this.facebook;
  }
  get getIN() {
	return this.linkedin;
  }
  get getPos() {
	return this.position;
  }
}