<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateAttendanceImagesNullable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('attendances', function (Blueprint $table) {
            // Modify the before_img and after_img columns to be nullable
            $table->string('before_img')->nullable()->change();
            $table->string('after_img')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('attendances', function (Blueprint $table) {
            // Revert the changes by making them non-nullable again
            $table->string('before_img')->nullable(false)->change();
            $table->string('after_img')->nullable(false)->change();
        });
    }
}
