import axios from 'axios';
const API_URL = 'http://localhost:8000';

export default class ImageService{
	
	constructor(){}
	
	
	// getCustomers() {
	// 	const url = `${API_URL}/api/customers/`;
	// 	return axios.get(url).then(response => response.data);
	// }  
	// getCustomersByURL(link){
	// 	const url = `${API_URL}${link}`;
	// 	return axios.get(url).then(response => response.data);
	// }
	// getCustomer(pk) {
	// 	const url = `${API_URL}/api/customers/${pk}`;
	// 	return axios.get(url).then(response => response.data);
	// }
	// deleteCustomer(customer){
	// 	const url = `${API_URL}/api/customers/${customer.pk}`;
	// 	return axios.delete(url);
	// }
    // updateCustomer(customer){
	// 	const url = `${API_URL}/api/customers/${customer.pk}`;
	// 	return axios.put(url,customer);
	// }
	postImageData(imageData){
		const url = `${API_URL}/api/Image/`;
		return axios.post(url,imageData).then(response => response.data);
	}

}