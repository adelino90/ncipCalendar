<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEventTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('events', function (Blueprint $table) {
            $table->increments('eventId');
            $table->string('eventName',100);
            $table->unsignedInteger('eventTypeId')->nullable();
            $table->foreign('eventTypeId')->references('eventTypeId')
                            ->on('event_type')
                            ->onDelete('cascade')->nullable();
            $table->string('eventOtherType',100)->nullable();
            $table->string('eventDetails',250)->nullable();
            $table->string('eventZoomLink',1000)->nullable();
            $table->date('eventDateFrom');
            $table->date('eventDateTo');
            $table->string('eventNotificationSchedule',25)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('events');
    }
}
