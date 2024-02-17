
import { Service } from "../../service/interfaces/service.interface";


interface ClinicFull {
  name: string;
  email: string;
  phone: string;
  services: Service[];
  address: string;
}

export default ClinicFull;