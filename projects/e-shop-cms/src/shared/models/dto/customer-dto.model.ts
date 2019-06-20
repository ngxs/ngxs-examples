/** client model dto */
export interface CustomerDTO {
    /** unique id */
    id: number;
    /** name */
    firstName: string;
    /** surname */
    lastName: string;
    /** email */
    email: string;
    /** gender */
    gender: string;
    /** ip address used for registration */
    ipAddress: string;
}
