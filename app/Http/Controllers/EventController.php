<?php

namespace App\Http\Controllers;

use App\Models\EventModel;
use App\Models\EventTypeModel;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function saveEvent(Request $request)
    {
        $eventData = [
                    'eventName' => $request->input('text'),
                    'eventDateFrom' => $request->input('dayFrom'),
                    'eventDateTo' => $request->input('dayTo'),
                    'eventTypeId' => $request->input('eventTypeId'),
                    'eventDetails' => $request->input('eventDetails'),
                    'eventNotificationSchedule' => $request->input('eventNotificationSchedule'),
                    'eventZoomLink' => $request->input('eventZoomLink'),
                    ];

        $createEvent = EventModel::create($eventData);
        return $createEvent;
    }


    public function getAllEvents(Request $request){

        $data = EventModel::select(['eventName as title', 'eventDateFrom as start','eventDateTo as end'])->get();
        return $data;
        
    }

    public function getAllEventTypes(Request $request){
        $data = EventTypeModel::get();
        return $data;
    }
}
