<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddUnitsToUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (! Schema::hasColumn('users', 'units')) {
            Schema::table('users', function (Blueprint $table) {
                $table->string('units')->nullable()->default(null)->after('password');
            });
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (Schema::hasColumn('users', 'units')) {
            Schema::table('users', function (Blueprint $table) {
                $table->dropColumn('units');
            });
        }
    }
}
