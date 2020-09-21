export function getSemester(semesters, semesterID) {
    return semesters.find(s => s.semesterID === semesterID);
}