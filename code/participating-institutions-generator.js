const fs = require("fs");
const readXlsxFile = require("read-excel-file/node");
const excelfilepath =
  "C:\\Users\\UM127517\\Downloads\\Participating_Institutions.xlsx";

readXlsxFile(excelfilepath, { sheet: "Sheet1" }).then(rows => {
  const template = fs
    .readFileSync(
      "C:\\xampp\\htdocs\\rise2019dev\\participating-institutions-template.html"
    )
    .toString();
  let content = buildContent(rows);
  content = template.replace("{Content}", content);
  fs.writeFileSync(
    "C:\\xampp\\htdocs\\rise2019dev\\participatinginstitutions.html",
    content
  );
});

function buildContent(rows) {
  const institution_types = [
    "University/College",
    "Government",
    "Media",
    "Nonprofit",
    "Industry/Business",
    "Research Center",
    "Task Force"
  ];
  const institutionIds = [
    "higher-Ed",
    "government",
    "media",
    "nonprofit",
    "industrybusiness",
    "researchcenter",
    "task-force"
  ];
  let content = "";

  for (
    let institution_type_count = 0;
    institution_type_count < institution_types.length;
    institution_type_count++
  ) {
    let filtered_rows = rows.filter(
      row => row[1] == institution_types[institution_type_count]
    );
    let institutions = filtered_rows.map(function(value, index) {
      return value[0];
    }); //get columns
    let institutionTypeContent = "";
    for (let rowcount = 0; rowcount < institutions.length; rowcount++) {
      let institutionRowElem = addInstitutionRow(institutions[rowcount]);
      institutionTypeContent = institutionTypeContent.concat(
        institutionRowElem
      );
    }
    let institutionContent = buildInstitutionTemplate(
      institutionIds[institution_type_count],
      institution_types[institution_type_count],
      institutionTypeContent
    );
    content = content.concat(institutionContent);
  }
  return content;
}

function addInstitutionRow(institutionName) {
  let institutionRowElem = `<tr style="height:15.0pt">
    <td nowrap="nowrap" style="background:white; width:248.0pt; padding:0in 5.4pt 0in 5.4pt; height:15.0pt" valign="bottom" width="331">
            <ul>
            <li><span style="font-size:11pt"><span style="line-height:normal"><span style="font-family:Calibri,sans-serif"><span style="color:black">${institutionName}</span></span>
            </span>
            </span>
            </li>
            </ul>
    </td>
    </tr>`;
  return institutionRowElem;
}

function buildInstitutionTemplate(
  institutionId,
  institutionType,
  institutionTypeContent
) {
  let institutionContent = `<div class="field--item" id= "${institutionId}">
        <div data-quickedit-entity-id="paragraph/411" class="paragraph paragraph--type--_-column-text paragraph--view-mode--default" data-quickedit-entity-instance-id="0" id="">
        <div class="row">
        <div class="col-md-12 col-xs-12 two-col-text">
        
        <div class="field field--name-field-column-title field--type-text field--label-hidden field--item" data-quickedit-field-id="paragraph/411/field_column_title/en/default">${institutionType}</div>
        <div data-quickedit-field-id="paragraph/411/field_column_body/en/default" class="field field--name-field-column-body field--type-text-long field--label-hidden field--item">
                <table class="Table" style="width:485.0pt; border-collapse:collapse; border:undefined" width="0">
                    <tbody>
                        ${institutionTypeContent}
                    </tbody>
                </table>
                </div>
        </div> 
        </div>
        </div>
        </div>`;
  return institutionContent;
}
