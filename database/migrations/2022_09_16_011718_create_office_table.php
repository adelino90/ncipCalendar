<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOfficeTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('office', function (Blueprint $table) {
            $table->increments('officeId');
            $table->unsignedInteger('bureauId')->nullable();
            $table->foreign('bureauId')->references('bureauId')
                            ->on('bureau_region')
                            ->onDelete('cascade');
            $table->string('shortName',50);
            $table->string('longName',250);
            $table->string('officeType',25);
            $table->string('officeCode',50);
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
        Schema::dropIfExists('office');
    }
}
