export const getUserFilterQuery = (gender:any, domain:any, available:any) => {
    switch (gender) {
        case "male":
          gender = "Male";
          break;
        case "female":
          gender = "Female";
        default:
          gender = undefined;
          break;
      }

      const queryInput:{
        gender?: string;
        domain?: string;
        available?: boolean;
      } = { };

      if(gender){
        queryInput.gender = gender;
      }

      if(domain){
        queryInput.domain = domain.toString();
      }

      if(available === "yes"){
        queryInput.available = true;
      }else if(available === "no"){
        queryInput.available = false;
      }

      return queryInput;
}