<div class="box">
    <div class="box-header">
        <h3 class="box-title">Recent Deployments</h3>
    </div><!-- /.box-header -->
    <div class="box-body table-responsive">
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Deployer</th>
                    <th>Committer</th>
                    <th>Commit</th>
                    <th>Status</th>
                    <th>&nbsp;</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($deployments as $deployment)
                <tr id="deployment_{{ $deployment->id }}">
                    <td>{{ $deployment->run->format('jS F Y g:i:s A') }}</td>
                    <td>{{ $deployment->user->name }}</td>
                    <td>{{ $deployment->committer}}</td>
                    <td><a href="#">{{ $deployment->commit }}</a></td>
                    <td>
                        <span class="label label-{{ deployment_css_status($deployment) }}"><i class="fa fa-{{ deployment_icon_status($deployment) }}"></i> {{ $deployment->status }}</span>
                    </td>
                    <td>
                        <div class="btn-group pull-right">
                            <button type="button" class="btn btn-default" title="Re-Deploy"><i class="fa fa-cloud-upload"></i></button>
                            <button type="button" class="btn btn-default" title="Details"><i class="fa fa-info-circle"></i></button>
                        </div>
                    </td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </div>
</div>