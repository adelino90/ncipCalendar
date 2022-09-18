<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateViberGroupParticipantsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('viber_group_participants', function (Blueprint $table) {
            $table->increments('viberGroupParticipantsId');
            $table->unsignedInteger('viberGroupId')->nullable();
            $table->string('userUuid',50)->nullable();
            $table->foreign('viberGroupId')->references('viberGroupId')
                            ->on('viber_groups')
                            ->onDelete('cascade');
            $table->foreign('userUuid')->references('userUuid')
                            ->on('users')
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
        Schema::dropIfExists('viber_group_participants');
    }
}
