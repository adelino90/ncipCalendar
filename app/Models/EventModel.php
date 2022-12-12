<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EventModel extends Model
{
    use HasFactory;
    protected $table = 'events';

    protected $fillable = ['eventName','eventDateFrom','eventDateTo','eventTypeId','userUuid','eventDetails','eventNotificationSchedule','eventZoomLink', 'officeId'];
}


