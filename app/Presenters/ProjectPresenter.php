<?php

namespace REBELinBLUE\Deployer\Presenters;

use Illuminate\Support\Facades\Lang;
use REBELinBLUE\Deployer\Project;

/**
 * The view presenter for a project class.
 * @property integer status
 * @property string readable_status
 */
class ProjectPresenter extends CommandPresenter
{
    /**
     * Returns the build status needed by CCTray
     * These strings can not be translated.
     *
     * @return string
     */
    public function presentCcTrayStatus()
    {
        if ($this->status === Project::FINISHED || $this->status === Project::FAILED) {
            return 'Sleeping';
        } elseif ($this->status === Project::DEPLOYING) {
            return 'Building';
        } elseif ($this->status === Project::PENDING) {
            return 'Pending';
        }

        return 'Unknown';
    }
}
