Aws.config.update({
	region: 'sa-east-1',
	credentials:Aws::Credentials.new(ENV['AWS_KEY'], ENV['AWS_SECRET'])
})

S3_BUCKET= Aws::S3::Resource.new.bucket(ENV['S3_BUCKET'])