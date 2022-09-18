<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEventParticipantsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('event_participants', function (Blueprint $table) {
            $table->increments('eventParticipantId');
            $table->unsignedInteger('eventId')->nullable();
            $table->string('userUuid',50)->nullable();
            $table->unsignedInteger('officeId')->nullable();
            $table->unsignedInteger('viberGroupId')->nullable();

            $table->foreign('eventId')->references('eventId')
                            ->on('events')
                            ->onDelete('cascade');
            $table->foreign('userUuid')->references('userUuid')
                            ->on('users')
                            ->onDelete('cascade');
            $table->foreign('officeId')->references('officeId')
                            ->on('office')
                            ->onDelete('cascade');
            $table->foreign('viberGroupId')->references('viberGroupId')
                            ->on('viber_groups')
                            ->onDelete('cascade');

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
        Schema::dropIfExists('event_participants');
    }
}
