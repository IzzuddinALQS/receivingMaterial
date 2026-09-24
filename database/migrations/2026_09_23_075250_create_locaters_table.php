<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('locaters', function (Blueprint $table) {
            $table->id();
            $table->string('code', 50)->unique();
            $table->string('warehouse_name');
            $table->string('area_rack');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('locaters');
    }
};
