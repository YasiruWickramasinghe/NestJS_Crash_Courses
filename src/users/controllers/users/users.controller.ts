import { Body, Controller, Get, Param, ParseBoolPipe, ParseIntPipe, Post, Query, Req, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';

@Controller('users')
export class UsersController {

    //Get  Method
        @Get()
        getUsers() {
            return { username: 'yasiru', email: 'yasiru@gmail.com' }
        }

        //Query Parameter
        //this use for filtering results
        // @Get('query')
        // getUsersQuaryParams(@Query('sortBy') sortBy: string) {
        //     console.log(sortBy)
        //     return { username: 'yasiru', email: 'yasiru@gmail.com' }
        // }

        //Add Validation

            @Get('query')
            getUsersQuaryParams(@Query('sortDesc', ParseBoolPipe) sortDesc: boolean) {
                return { username: 'yasiru', email: 'yasiru@gmail.com' }
            }


        // @Get('/posts')
        // getUsersPosts() {
        //     return [
        //         {
        //             username: 'yasiru', email: 'yasiru@gmail.com', posts: [
        //                 {
        //                     id: 1,
        //                     title: 'Post 1',
        //                 },
        //                 {
        //                     id: 2,
        //                     title: 'Post 2',
        //                 },
        //                 {
        //                     id: 3,
        //                     title: 'Post 3',
        //                 },
        //             ]
        //         }
        //     ];
        // }

        // @Get('posts/comments')
        // getUsersPostsComments() {
        //     return [

        //         {
        //             id: 1,
        //             title: 'Post 1',
        //             comments: []
        //         },
        //         {
        //             id: 2,
        //             title: 'Post 2',
        //             comments: []
        //         },
        //         {
        //             id: 3,
        //             title: 'Post 3',
        //             comments: []
        //         },

        //     ];
        // }

    //Post Method

        // //Combining with express framework
        // @Post('create')
        // createUser(@Req() request:Request, @Res() response:Response ){
        //     console.log(request.body);
        //     response.send('Created');
        // }

        // @Post('create')
        // createUser(@Body() userData:CreateUserDto){
        //     console.log(userData);
        //     return {};
        // }

        //Add Validation
        //npm i --save class-validator class-transformer

            @Post('create')
            @UsePipes(new ValidationPipe())
            createUser(@Body() userData:CreateUserDto){
                console.log(userData);
                return {};
            }

    //Get User by Id Method

        // //Combining with express framework
        // @Get(':id')
        // getUserById(@Req() request:Request, @Res() response:Response){
        //     console.log(request.params);
        //     response.send('');
        // }

        // @Get(':id')
        // getUserById(@Param('id') id:string){
        //     console.log(id);
        //     return {id}
        // }

        //Add Validation
        //id should be number becourse we use parseintpipe
        
            @Get(':id')
            getUserById(@Param('id', ParseIntPipe) id:number){
                console.log(id);
                return {id}
            }

        // //Pass two id's to params
        // @Get(':id/:postId')
        // getUserByIdAndPostId(@Param('id') id:string, @Param('postId') postId:string){
        //     console.log(id);
        //     return {id, postId}
        // }

    
}
