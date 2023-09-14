export default class ViewUserDTO {
    constructor(user) {
        this.name = `${user.first_name} ${user.last_name}`,
        this.email =  user.email,
        this.role =  user.role,
        this.id =  user._id,
        this.cart = user.cart
        this.documents = user.documents
        this.last_connection = user.last_connection
    }
}