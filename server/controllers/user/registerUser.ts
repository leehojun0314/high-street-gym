import { validateRegister } from '@/utils/functions';
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import prisma from '@/prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
export function registerUser(req: Request, res: Response) {
  const { firstname, lastname, email, password, mobile, gender, dob } =
    req.body;
  console.log('dob: ', dob);
  const validationRes = validateRegister(req.body);
  if (!validationRes.status) {
    console.log('validation error: ', validationRes.error);
    res.status(404).send({ error: validationRes.error });
    return;
  }
  bcrypt.hash(password, 10, async (err, hash) => {
    if (err) {
      console.log('error hashing password: ', err);
      res.status(500).send('Error hashing password');
      return;
    }
    try {
      const user = await prisma.user.create({
        data: {
          user_firstname: firstname,
          user_lastname: lastname,
          user_email: email,
          user_password: hash,
          user_phone: mobile,
          gender: gender,
          dob: dob ? new Date(dob) : null,
          user_role: 'MEMBER',
        },
      });
      console.log('created user: ', user);
      res.status(201).send({
        message: 'User created successfully',
      });
    } catch (error) {
      console.log('create user error: ', error);
      if (error instanceof PrismaClientKnownRequestError) {
        console.log('message: ', error.message);
        console.log('code: ', error.code);
        console.log('meta: ', error.meta);
        console.log('stack: ', error.stack);
        if (error.code === 'P2002') {
          res.status(409).send('Email already exists');
          return;
        }
      }
      res.status(500).send('Error creating user');
    }
  });
}
