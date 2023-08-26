import axios from "axios"
import { Student } from "./student.type";

// const baseURL = "http://localhost:8080"

const request = async <T>({
    url,
    method,
    data
}: {
    method: string,
    url: string,
    data?: any
}) => {
    return await axios
        .request<T>({
            url,
            method,
            data
        })
        .then(res => res.data);
}

export class Server {
    static getStudent() {
        return request<Student[]>({
            url: '/api/v1/student',
            method: 'get',
        });
    }

    static createStudent(student: Student) {
        return request<Student[]>({
            url: '/api/v1/student',
            method: 'post',
            data: student
        });
    }

    static updateStudent(student: Student) {
        return request<Student[]>({
            url: `/api/v1/student/${student.id}`,
            method: 'put',
            data: student
        });
    }

    static deleteStudent(id: number) {
        return request<Student[]>({
            url: `/api/v1/student/${id}`,
            method: 'delete'
        });
    }
}
