import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface User {
  id: number;
  email: string;
  password: string;
  confirmPassword: string;
  contact: string;
}

const useAddUser = () => {
  return useMutation({
    /*mutationFn: (user:User) =>{
      axios
        .post('http://localhost:8080/user',user)
        .then(res=>res.data)
    }*/
  });
};

export default useAddUser;
