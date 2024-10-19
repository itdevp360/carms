<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

use App\Events\DelayFormsEvent;

class DelayFormsCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:delay-forms-command';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        return event(new DelayFormsEvent());
    }
}
