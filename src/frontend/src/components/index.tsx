import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { MdAdd, MdDelete, MdEdit } from 'react-icons/md';

import { Table } from './table/Table';
import { Form } from './form/Form';
import { Server } from './server';
import { Student } from './student.type';
import Modal from './modal/Modal';

import './index.css';

export const Components = () => {
  const initialValue = {
    name: '',
    email: '',
    dob: new Date()
  }
  const [student, setStudent] = useState(initialValue);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isModal, setIsModal] = useState(false);

  const queryClient = useQueryClient();
  const { data: students } = useQuery(["students"], Server.getStudent);
  const { mutate: createStudent } = useMutation(
    (student: Student) => Server.createStudent(student), {
    onSuccess: () => {
      queryClient.invalidateQueries(['students']);
    },
  });
  const { mutate: updateStudent } = useMutation(
    (student: Student) => Server.updateStudent(student), {
    onSuccess: () => {
      queryClient.invalidateQueries(['students']);
    },
  });
  const { mutate: deleteStudent } = useMutation(
    (id: number) => Server.deleteStudent(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(['students']);
    },
  });

  return (
    <>
      <button
        onClick={() => {
          setIsUpdate(false);
          setStudent(initialValue);
          setIsModal(true);
        }}
      >
        Add Student
        <MdAdd />
      </button>
      <Modal
        show={isModal}
        onCloseButtonClick={() => setIsModal(false)}
        children={
          <Form
            initialValues={student}
            onSubmit={(values: Student, { setSubmitting, resetForm }) => {
              isUpdate ? updateStudent(values) : createStudent(values);
              setSubmitting(false);
              resetForm();
              setIsModal(false);
            }}
            customButton={
              <button type="submit">
                {isUpdate ? 'Edit' : 'Add'} Student
              </button>
            }
          />
        }
      />
      <Table
        data={students ? students : []}
        columns={[
          {
            accessorKey: "id",
            header: "ID"
          },
          {
            accessorKey: "name",
            header: "Name"
          },
          {
            accessorKey: "email",
            header: "Email"
          },
          {
            accessorKey: "dob",
            header: "Date of Birth"
          },
          {
            accessorKey: "age",
            header: "Age"
          },
          {
            header: 'actions',
            cell: ({ row }) => (
              <>
                <MdEdit
                  {...{
                    style: { cursor: 'pointer' },
                    color: 'blue'
                  }}
                  onClick={() => {
                    setIsUpdate(true);
                    setStudent(row.original);
                    setIsModal(true);
                  }}
                />
                <MdDelete
                  {...{
                    style: { cursor: 'pointer' },
                    color: 'red'
                  }}
                  onClick={() => deleteStudent(row.getValue('id'))}
                />
              </>
            )
          },
        ]}
      />
    </>
  );
}