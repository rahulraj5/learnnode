# learnnode

# search for and learn

object destructure in js

const result = validateCourse(req.body);
replace it from below code
const { error } = validationCourse(req.body); //result.error
than we use 
if(error){

}


# because req.body has two properties - value and error 