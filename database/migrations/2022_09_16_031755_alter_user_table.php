<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterUserTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {

            $table->unsignedInteger('officeId')->after('lastname')->nullable();
            $table->unsignedInteger('roleId')->after('officeId')->nullable();
            $table->foreign('officeId')->references('officeId')
                ->on('office')
                ->onDelete('cascade');
            $table->foreign('roleId')->references('roleId')
                ->on('role')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
          Schema::table('users', function($table) {
                $table->dropForeign(['officeId']);
                $table->dropForeign(['roleId']);
                $table->dropColumn('officeId');
                $table->dropColumn('roleId');
            });
    }
}
