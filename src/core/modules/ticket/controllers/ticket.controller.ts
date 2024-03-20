import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiForbiddenResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { TicketService } from '../services/ticket/ticket.service';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { IsAuthenticateGuard } from 'src/authentication/guards/is.authenticate.guard';
import { IsAuthorizedGuard } from 'src/authentication/guards/is.authorized.guard';
import { SwaggerExceptionResponseDto } from 'src/shared/configs/swagger/swagger.exception.response.dto';
import { CreateTicketDto } from 'src/shared/dtos/create.ticket.dto';
import { TicketEntity } from 'src/shared/db/entities/ticket.entity';
import { UpdateTicketDto } from 'src/shared/dtos/update.ticket.dto';

@ApiTags('Ticket')
@Controller('ticket')
export class TicketController {

    constructor(private readonly ticketService: TicketService) {}


    @ApiBearerAuth()
    @ApiOkResponse()
    @Roles(["ADMIN", "USER"])
    @UseGuards(IsAuthenticateGuard, IsAuthorizedGuard)
    @ApiUnauthorizedResponse({ type: SwaggerExceptionResponseDto })
    @ApiForbiddenResponse({ type: SwaggerExceptionResponseDto })
    @Get('utilities/status/all')
    getStatusTickets() {
        return this.ticketService.getTicketStatus();
    }

    @ApiBearerAuth()
    @ApiOkResponse()
    @Roles(["ADMIN"])
    @UseGuards(IsAuthenticateGuard, IsAuthorizedGuard)
    @ApiUnauthorizedResponse({ type: SwaggerExceptionResponseDto })
    @ApiForbiddenResponse({ type: SwaggerExceptionResponseDto })
    @Get('all')
    getAllTickets() {
        return this.ticketService.getAllTickets();
    }

    @ApiBearerAuth()
    @ApiOkResponse()
    @Roles(["ADMIN", "USER"])
    @UseGuards(IsAuthenticateGuard, IsAuthorizedGuard)
    @ApiUnauthorizedResponse({ type: SwaggerExceptionResponseDto })
    @ApiForbiddenResponse({ type: SwaggerExceptionResponseDto })
    @Get('user/ticket/:id')
    getAllTicketById(@Param('id') id: number) {
        return this.ticketService.getTicketById(id);
    }

    @ApiBearerAuth()
    @ApiOkResponse()
    @Roles(["ADMIN", "USER"])
    @UseGuards(IsAuthenticateGuard, IsAuthorizedGuard)
    @ApiUnauthorizedResponse({ type: SwaggerExceptionResponseDto })
    @ApiForbiddenResponse({ type: SwaggerExceptionResponseDto })
    @Get('user/all/:id')
    getAllTicketByUserId(@Param('id') id: number) {
        return this.ticketService.getTicketByUserId(id);
    }

    @ApiBearerAuth()
    @Roles(["ADMIN", "USER"])
    @ApiCreatedResponse({type: TicketEntity})
    @UseGuards(IsAuthenticateGuard, IsAuthorizedGuard)
    @ApiUnauthorizedResponse({ type: SwaggerExceptionResponseDto })
    @ApiForbiddenResponse({ type: SwaggerExceptionResponseDto })
    @Post('create')
    createTicket(@Body() ticket: CreateTicketDto) {
        return this.ticketService.createTicket(ticket);
    }

    @ApiBearerAuth()
    @Roles(["ADMIN", "USER"])
    @ApiCreatedResponse({type: TicketEntity})
    @UseGuards(IsAuthenticateGuard, IsAuthorizedGuard)
    @ApiUnauthorizedResponse({ type: SwaggerExceptionResponseDto })
    @ApiForbiddenResponse({ type: SwaggerExceptionResponseDto })
    @Put('update/:id')
    updateTicket(@Param('id') id: number, @Body() ticket: UpdateTicketDto) {
        return this.ticketService.updateTicket(id, ticket);
    }

    @ApiBearerAuth()
    @ApiOkResponse()
    @Roles(["ADMIN"])
    @UseGuards(IsAuthenticateGuard, IsAuthorizedGuard)
    @ApiUnauthorizedResponse({ type: SwaggerExceptionResponseDto })
    @ApiForbiddenResponse({ type: SwaggerExceptionResponseDto })
    @Delete('delete/:id')
    deleteTicket(@Param('id') id: number) {
        return this.ticketService.deleteTicketById(id);
    }
}
