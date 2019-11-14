const RISEModel = {};

//add paths where you want to store below pages
RISEModel.outputPaths = {
  programsFolder: "",
  speakersFolder: "",
  agenda1: "",
  agenda2: "",
  agenda3: "",
  targetlocationFolder: "../output/"
};

RISEModel.inputPaths = {
  imageFolderLocation: "https://rise2019.org/img/Speakers/",
  //   targetlocationFolder: "C://Users/AT989579/Documents/RISE Git/",
  excelfilepath: "../data/Master Contact List.xlsx",
  programTemplatePath: "../templates/rise-session-template.html",
  speakerTemplate: "../templates/speaker_template.html",
  riseAllSpeakers: "../templates/rise-speakers-template.html",
  agendaTemplatepath: "../templates/"
};

module.exports.RISEModel = RISEModel;
