const express = require('express');
const app = express();
const port = 3000; // or any other port you prefer
const data = require('./materialDb.json'); // Assuming your JSON data is in data.json file
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Endpoint for explore courses
app.get('/faculties', (req, res) => {
  res.json(data["Material DB"]);
});

// Endpoint for courses
app.get('/faculties/:facultyName/branches/:branchName/semesters/:semesterName/subjects', (req, res) => {
  const facultyName = req.params.facultyName;
  const branchName = req.params.branchName;
  const semesterName = req.params.semesterName;
  if (data["Material DB"]["faculties"][facultyName] && data["Material DB"]["faculties"][facultyName]["branches"][branchName] && data["Material DB"]["faculties"][facultyName]["branches"][branchName][semesterName]) {
    res.json(Object.keys(data["Material DB"]["faculties"][facultyName]["branches"][branchName][semesterName]).filter(key => key !== 'semesterName' && key !== 'branchName'));
  } else {
    res.status(404).send('Faculty, branch, or semester not found');
  }
});



// endpoint for uploading a new material folder like Additional Assignment folder
app.post('/faculties/:facultyName/branches/:branchName/semesters/:semesterName/subjects/:subjectName/materials', (req, res) => {
  const facultyName = req.params.facultyName;
  const branchName = req.params.branchName;
  const semesterName = req.params.semesterName;
  const subjectName = req.params.subjectName;
  const newMaterial = req.body; // assuming you're sending the new material in the request body

  if (newMaterial === undefined) {
    res.status(400).send('Request body is missing');
    return;
  }

  if (data["Material DB"]["faculties"][facultyName] && 
      data["Material DB"]["faculties"][facultyName].branches[branchName] && 
      data["Material DB"]["faculties"][facultyName].branches[branchName][semesterName] && 
      data["Material DB"]["faculties"][facultyName].branches[branchName][semesterName][subjectName]) {

      // Add the new material to the subject map
      data["Material DB"]["faculties"][facultyName].branches[branchName][semesterName][subjectName][newMaterial.materialName] = {
          "materialName": newMaterial.materialName
      };

      res.status(201).send('New material added');
  } else {
      res.status(404).send('Faculty, branch, semester, or subject not found');
  }
});













// endpoint for uploading a new material inside a folder like pdf

app.post('/faculties/:facultyName/branches/:branchName/semesters/:semesterName/subjects/:subjectName/materials/:materialName', (req, res) => {
  const facultyName = req.params.facultyName;
  const branchName = req.params.branchName;
  const semesterName = req.params.semesterName;
  const subjectName = req.params.subjectName;
  const materialName = req.params.materialName;
  const newMaterial = req.body; // assuming you're sending the new material in the request body

  if (newMaterial === undefined) {
    res.status(400).send('Request body is missing');
    return;
  }

  if (data["Material DB"]["faculties"][facultyName] && 
      data["Material DB"]["faculties"][facultyName].branches[branchName] && 
      data["Material DB"]["faculties"][facultyName].branches[branchName][semesterName] && 
      data["Material DB"]["faculties"][facultyName].branches[branchName][semesterName][subjectName] &&
      data["Material DB"]["faculties"][facultyName].branches[branchName][semesterName][subjectName][materialName]) {

      // Add the new material to the materialName map
      data["Material DB"]["faculties"][facultyName].branches[branchName][semesterName][subjectName][materialName][newMaterial.pdfName] = {
          "pdfName": newMaterial.pdfName,
          "link": newMaterial.link
      };

      res.status(201).send('New material added');
  } else {
      res.status(404).send('Faculty, branch, semester, or subject not found');
  }
});





app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});




















/*app.get('/faculties/:facultyName/branches/:branchName/semesters/:semesterName/subjects', (req, res) => {
  res.json(data["Material DB"]);
}); */

// Endpoint to get branches of a specific faculty
/* app.get('/faculties/:facultyName/branches', (req, res) => {
  const facultyName = req.params.facultyName;
  if (data["Material DB"][facultyName]) {
    res.json(data["Material DB"][facultyName].branches);
  } else {
    res.status(404).send('Faculty not found');
  }
}); */

// Endpoint to get semesters of a specific branch of a specific faculty
/* app.get('/faculties/:facultyName/branches/:branchName/semesters', (req, res) => {
  const facultyName = req.params.facultyName;
  const branchName = req.params.branchName;
  if (data["Material DB"][facultyName] && data["Material DB"][facultyName].branches[branchName]) {
    res.json(data["Material DB"][facultyName].branches[branchName]);
  } else {
    res.status(404).send('Faculty or branch not found');
  }
}); */


/*app.get('/faculties/:facultyName/branches/:branchName/semesters/:semesterName/subjects/:subjectName/materials', (req, res) => {
  const facultyName = req.params.facultyName;
  const branchName = req.params.branchName;
  const semesterName = req.params.semesterName;
  const subjectName = req.params.subjectName;
  if (data["Material DB"]["faculties"][facultyName] && data["Material DB"]["faculties"][facultyName].branches[branchName] && data["Material DB"]["faculties"][facultyName].branches[branchName][semesterName] && data["Material DB"]["faculties"][facultyName].branches[branchName][semesterName][subjectName]) {
    res.json(Object.keys(data["Material DB"]["faculties"][facultyName].branches[branchName][semesterName][subjectName]).filter(key => key !== 'subjectName'));
  } else {
    res.status(404).send('Faculty, branch, semester, or subject not found');
  }
}); */



/* app.get('/faculties/:facultyName/branches/:branchName/semesters/:semesterName/subjects/:subjectName/materials/:materialName', (req, res) => {
  const facultyName = req.params.facultyName;
  const branchName = req.params.branchName;
  const semesterName = req.params.semesterName;
  const subjectName = req.params.subjectName;
  const materialName = req.params.materialName;

  if (data["Material DB"]["faculties"][facultyName] && 
      data["Material DB"]["faculties"][facultyName].branches[branchName] && 
      data["Material DB"]["faculties"][facultyName].branches[branchName][semesterName] && 
      data["Material DB"]["faculties"][facultyName].branches[branchName][semesterName][subjectName] &&
      data["Material DB"]["faculties"][facultyName].branches[branchName][semesterName][subjectName][materialName]) {

      // Return the material
      res.json(data["Material DB"]["faculties"][facultyName].branches[branchName][semesterName][subjectName][materialName]);
  } else {
      res.status(404).send('Faculty, branch, semester, or subject not found');
  }
}); */