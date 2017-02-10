import * as util from "gulp-util";
import * as runSequence from "run-sequence";
import Config from "@maxxton/build-tools/tools/config";
import { loadTasks, loadCompositeTasks } from "@maxxton/build-tools/tools/utils";


loadTasks( Config.SEED_TASKS_DIR );
loadCompositeTasks( Config.SEED_COMPOSITE_TASKS, Config.PROJECT_COMPOSITE_TASKS );
loadTasks( "./tools/task/" );

// --------------
// Clean dev/coverage that will only run once
// this prevents karma watchers from being broken when directories are deleted
let firstRun = true;
Config.gulp.task( 'clean.once', ( done: any ) => {
  if ( firstRun ) {
    firstRun = false;
    runSequence( 'check.tools', 'clean.dev', 'clean.coverage', done );
  } else {
    util.log( 'Skipping clean on rebuild' );
    done();
  }
} );

