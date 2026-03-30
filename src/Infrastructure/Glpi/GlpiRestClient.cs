using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class TicketController : ControllerBase
{
    private readonly ITicketService _service;

    public TicketController(ITicketService service)
    {
        _service = service;
    }

    [HttpPost]
    public async Task<IActionResult> CreateTicket(CreateTicketDto dto)
    {
        var result = await _service.CreateTicket(dto);
        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetTicket(int id)
    {
        var ticket = await _service.GetTicket(id);
        return Ok(ticket);
    }

    [HttpGet("user/{userId}")]
    public async Task<IActionResult> GetByUser(int userId)
    {
        var tickets = await _service.GetByUser(userId);
        return Ok(tickets);
    }
}